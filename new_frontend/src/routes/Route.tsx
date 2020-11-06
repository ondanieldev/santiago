import React, { useCallback } from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
  needPermissions?: (
    | 'create_new_enrollments_permiss'
    | 'validate_enrollments_permiss'
    | 'create_extra_debits_permiss'
    | 'pay_debits_permiss'
    | 'discharge_payments_permiss'
    | 'crud_profiles_permiss'
    | 'crud_users_permiss'
    | 'crud_grades_permiss'
    | 'crud_extra_debits_permiss'
  )[];
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  needPermissions,
  ...rest
}) => {
  const { user } = useAuth();

  const checkForPermissions = useCallback(() => {
    let authorized = false;

    if (needPermissions) {
      needPermissions.forEach(permiss => {
        if (user.profile[permiss]) {
          authorized = true;
        }
      });
    } else {
      authorized = true;
    }

    return authorized;
  }, [needPermissions, user]);

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user && checkForPermissions() ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
