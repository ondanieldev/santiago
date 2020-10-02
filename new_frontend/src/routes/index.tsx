import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import NewResponsibles from '../pages/NewResponsibles';
import NewStudent from '../pages/NewStudent';
import EnrollmentsForAprooveOrDisaproove from '../pages/EnrollmentsForAprooveOrDisaproove';
import Enrollment from '../pages/Enrollment';
import EnrollmentsForCheckForDebits from '../pages/EnrollmentsForCheckForDebits';
import Debits from '../pages/Debits';
import Payments from '../pages/Payments';
import Profiles from '../pages/Profiles';
import Users from '../pages/Users';
import Grades from '../pages/Grades';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />

    <Route
      path="/enrollment-responsibles"
      component={NewResponsibles}
      isPrivate
      needPermissions={['new_enrollment_permiss']}
    />

    <Route
      path="/enrollment-student"
      component={NewStudent}
      isPrivate
      needPermissions={['new_enrollment_permiss']}
    />

    <Route
      path="/aproove-or-disaproove-enrollments"
      component={EnrollmentsForAprooveOrDisaproove}
      isPrivate
      needPermissions={['validate_enrollment_permiss']}
    />

    <Route
      path="/enrollments/:id"
      component={Enrollment}
      isPrivate
      needPermissions={['validate_enrollment_permiss']}
    />

    <Route
      path="/check-for-debits-enrollments"
      component={EnrollmentsForCheckForDebits}
      isPrivate
      needPermissions={['pay_debit_permiss']}
    />

    <Route
      path="/debits/:contractId"
      component={Debits}
      isPrivate
      needPermissions={['pay_debit_permiss']}
    />

    <Route
      path="/payments"
      component={Payments}
      isPrivate
      needPermissions={['discharge_payment_permiss']}
    />

    <Route
      path="/profiles"
      component={Profiles}
      isPrivate
      needPermissions={['crud_profiles_permiss']}
    />

    <Route
      path="/users"
      component={Users}
      isPrivate
      needPermissions={['crud_users_permiss']}
    />

    <Route
      path="/grades"
      component={Grades}
      isPrivate
      needPermissions={['crud_grades_permiss']}
    />
  </Switch>
);

export default Routes;
