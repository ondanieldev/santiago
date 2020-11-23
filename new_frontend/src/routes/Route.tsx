import React, { useCallback } from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';
import IPermissions from '../dtos/IPermissions';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
  needPermissions?: Extract<keyof IPermissions, keyof IPermissions>[];
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
