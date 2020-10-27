import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import NewEnrollment from '../pages/NewEnrollment';
import ValidateEnrollmentsMenu from '../pages/ValidateEnrollmentsMenu';
import EditEnrollment from '../pages/EditEnrollment';
import ValidateEnrollment from '../pages/ValidateEnrollment';
import PayDebitsMenu from '../pages/PayDebitsMenu';
import PayDebits from '../pages/PayDebits';
import ReceivePaymentsMenu from '../pages/ReceivePaymentsMenu';
import Profiles from '../pages/Profiles';
import Users from '../pages/Users';
import Grades from '../pages/Grades';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />

    <Route path="/new-enrollment" component={NewEnrollment} isPrivate />

    <Route
      path="/validate-enrollments"
      component={ValidateEnrollmentsMenu}
      isPrivate
      needPermissions={['validate_enrollment_permiss']}
    />

    <Route
      path="/validate-enrollments/:contract_id"
      component={ValidateEnrollment}
      isPrivate
      needPermissions={['validate_enrollment_permiss']}
    />

    <Route
      path="/edit-enrollment/:contract_id"
      component={EditEnrollment}
      isPrivate
      needPermissions={['validate_enrollment_permiss']}
    />

    <Route
      path="/pay-debits"
      component={PayDebitsMenu}
      isPrivate
      needPermissions={['pay_debit_permiss']}
    />

    <Route
      path="/pay-debits/:contract_id"
      component={PayDebits}
      isPrivate
      needPermissions={['pay_debit_permiss']}
    />

    <Route
      path="/receive-payments"
      component={ReceivePaymentsMenu}
      isPrivate
      needPermissions={['discharge_payment_permiss']}
    />

    {/* <Route
      path="/receive-payments/:contract_id"
      component={ReceivePayments}
      isPrivate
      needPermissions={['discharge_payment_permiss']}
    /> */}

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
