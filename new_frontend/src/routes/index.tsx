import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import NewEnrollment from '../pages/NewEnrollment';
import UnderAnalysisAndPendentEnrollments from '../pages/UnderAnalysisAndPendentEnrollments';
import ValidateEnrollment from '../pages/ValidateEnrollment';
import EditEnrollment from '../pages/EditEnrollment';
import Debits from '../pages/Debits';
import Payments from '../pages/Payments';
import Profiles from '../pages/Profiles';
import Users from '../pages/Users';
import Grades from '../pages/Grades';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />

    <Route path="/new-enrollment" component={NewEnrollment} isPrivate />

    <Route
      path="/under-analysis-pendent-enrollments"
      component={UnderAnalysisAndPendentEnrollments}
      isPrivate
    />

    <Route
      path="/validate-enrollment/:contract_id"
      component={ValidateEnrollment}
      isPrivate
    />

    <Route
      path="/edit-enrollment/:contract_id"
      component={EditEnrollment}
      isPrivate
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
