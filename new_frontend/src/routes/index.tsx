import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Dashboard from '../pages/Dashboard';

import NewEnrollment from '../pages/NewEnrollment';

import ValidateEnrollmentsGradesMenu from '../pages/ValidateEnrollmentsGradesMenu';
import ValidateEnrollmentsContractsMenu from '../pages/ValidateEnrollmentsContractsMenu';
import ValidateEnrollment from '../pages/ValidateEnrollment';

import EditEnrollment from '../pages/EditEnrollment';

import CreateExtraDebitsGradesMenu from '../pages/CreateExtraDebitsGradesMenu';
import CreateExtraDebitsByGrade from '../pages/CreateExtraDebitsByGrade';

import ExtraDebitsGradesMenu from '../pages/ExtraDebitsGradesMenu';
import ExtraDebitsContractsMenu from '../pages/ExtraDebitsContractsMenu';
import ExtraDebitsByContract from '../pages/ExtraDebitsByContract';

import PayDebitsGradesMenu from '../pages/PayDebitsGradesMenu';
import PayDebitsContractsMenu from '../pages/PayDebitsContractsMenu';
import PayDebitsByContract from '../pages/PayDebitsByContract';

import ReceivePaymentsGradesMenu from '../pages/ReceivePaymentsGradesMenu';
import ReceivePaymentsContractsMenu from '../pages/ReceivePaymentsContractsMenu';
import ReceivePaymentsByContract from '../pages/ReceivePaymentsByContract';

import Users from '../pages/Users';
import Grades from '../pages/Grades';
import Profiles from '../pages/Profiles';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />

    <Route
      path="/new-enrollment"
      component={NewEnrollment}
      needPermissions={['create_new_enrollments_permiss']}
      isPrivate
    />

    <Route
      path="/validate-enrollments/contracts/:contract_id"
      component={ValidateEnrollment}
      needPermissions={['validate_enrollments_permiss']}
      isPrivate
    />

    <Route
      path="/validate-enrollments/grades/:grade_id"
      component={ValidateEnrollmentsContractsMenu}
      needPermissions={['validate_enrollments_permiss']}
      isPrivate
    />

    <Route
      path="/validate-enrollments/grades"
      component={ValidateEnrollmentsGradesMenu}
      needPermissions={['validate_enrollments_permiss']}
      isPrivate
    />

    <Route
      path="/edit-enrollment/:contract_id"
      component={EditEnrollment}
      needPermissions={['validate_enrollments_permiss']}
      isPrivate
    />

    <Route
      path="/create-extra-debits/grades/:grade_id"
      component={CreateExtraDebitsByGrade}
      needPermissions={['create_extra_debits_permiss']}
      isPrivate
    />

    <Route
      path="/create-extra-debits/grades"
      component={CreateExtraDebitsGradesMenu}
      needPermissions={['create_extra_debits_permiss']}
      isPrivate
    />

    <Route
      path="/extra-debits/contracts/:contract_id"
      component={ExtraDebitsByContract}
      needPermissions={['crud_extra_debits_permiss']}
      isPrivate
    />

    <Route
      path="/extra-debits/grades/:grade_id"
      component={ExtraDebitsContractsMenu}
      needPermissions={['crud_extra_debits_permiss']}
      isPrivate
    />

    <Route
      path="/extra-debits/grades"
      component={ExtraDebitsGradesMenu}
      needPermissions={['crud_grades_permiss']}
      isPrivate
    />

    <Route
      path="/pay-debits/contracts/:contract_id"
      component={PayDebitsByContract}
      needPermissions={['pay_debits_permiss']}
      isPrivate
    />

    <Route
      path="/pay-debits/grades/:grade_id"
      component={PayDebitsContractsMenu}
      needPermissions={['pay_debits_permiss']}
      isPrivate
    />

    <Route
      path="/pay-debits/grades"
      component={PayDebitsGradesMenu}
      needPermissions={['pay_debits_permiss']}
      isPrivate
    />

    <Route
      path="/receive-payments/contracts/:contract_id"
      component={ReceivePaymentsByContract}
      needPermissions={['discharge_payments_permiss']}
      isPrivate
    />

    <Route
      path="/receive-payments/grades/:grade_id"
      component={ReceivePaymentsContractsMenu}
      needPermissions={['discharge_payments_permiss']}
      isPrivate
    />

    <Route
      path="/receive-payments/grades"
      component={ReceivePaymentsGradesMenu}
      needPermissions={['discharge_payments_permiss']}
      isPrivate
    />

    <Route
      path="/profiles"
      component={Profiles}
      needPermissions={['crud_profiles_permiss']}
      isPrivate
    />

    <Route
      path="/users"
      component={Users}
      needPermissions={['crud_users_permiss']}
      isPrivate
    />

    <Route
      path="/grades"
      component={Grades}
      needPermissions={['crud_grades_permiss']}
      isPrivate
    />
  </Switch>
);

export default Routes;
