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

    <Route path="/new-enrollment" component={NewEnrollment} isPrivate />

    <Route
      path="/validate-enrollments/contracts/:contract_id"
      component={ValidateEnrollment}
      isPrivate
    />

    <Route
      path="/validate-enrollments/grades/:grade_id"
      component={ValidateEnrollmentsContractsMenu}
      isPrivate
    />

    <Route
      path="/validate-enrollments/grades"
      component={ValidateEnrollmentsGradesMenu}
      isPrivate
    />

    <Route
      path="/edit-enrollment/:contract_id"
      component={EditEnrollment}
      isPrivate
    />

    <Route
      path="/create-extra-debits/grades/:grade_id"
      component={CreateExtraDebitsByGrade}
      isPrivate
    />

    <Route
      path="/create-extra-debits/grades"
      component={CreateExtraDebitsGradesMenu}
      isPrivate
    />

    <Route
      path="/extra-debits/contracts/:contract_id"
      component={ExtraDebitsByContract}
      isPrivate
    />

    <Route
      path="/extra-debits/grades/:grade_id"
      component={ExtraDebitsContractsMenu}
      isPrivate
    />

    <Route
      path="/extra-debits/grades"
      component={ExtraDebitsGradesMenu}
      isPrivate
    />

    <Route
      path="/pay-debits/contracts/:contract_id"
      component={PayDebitsByContract}
      isPrivate
    />

    <Route
      path="/pay-debits/grades/:grade_id"
      component={PayDebitsContractsMenu}
      isPrivate
    />

    <Route
      path="/pay-debits/grades"
      component={PayDebitsGradesMenu}
      isPrivate
    />

    <Route
      path="/receive-payments/contracts/:contract_id"
      component={ReceivePaymentsByContract}
      isPrivate
    />

    <Route
      path="/receive-payments/grades/:grade_id"
      component={ReceivePaymentsContractsMenu}
      isPrivate
    />

    <Route
      path="/receive-payments/grades"
      component={ReceivePaymentsGradesMenu}
      isPrivate
    />

    <Route path="/profiles" component={Profiles} isPrivate />

    <Route path="/users" component={Users} isPrivate />

    <Route path="/grades" component={Grades} isPrivate />
  </Switch>
);

export default Routes;
