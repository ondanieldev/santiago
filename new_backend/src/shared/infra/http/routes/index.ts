import { Router } from 'express';

import agreementsRouter from '@modules/agreements/infra/http/routes/agreements.routes';
import cacheRouter from '@shared/container/providers/CacheProvider/infra/http/routes/cache.routes';
import contractsRouter from '@modules/contracts/infra/http/routes/contracts.routes';
import contractDebitsRouter from '@modules/contracts/infra/http/routes/debits.routes';
import dischargesRouter from '@modules/discharges/infra/http/routes/discharges.routes';
import enrollmentsRouter from '@modules/enrollments/infra/http/routes/enrollments.routes';
import gradesRouter from '@modules/grades/infra/http/routes/grades.routes';
import paymentsRouter from '@modules/payments/infra/http/routes/payments.routes';
import personsRouter from '@modules/persons/infra/http/routes/persons.routes';
import profilesRouter from '@modules/profiles/infra/http/routes/profiles.routes';
import relationshipsRouter from '@modules/relationships/infra/http/routes/relationships.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import studentsRouter from '@modules/students/infra/http/routes/students.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/agreements', agreementsRouter);
routes.use('/cache', cacheRouter);
routes.use('/contracts', contractsRouter);
routes.use('/contracts', contractDebitsRouter);
routes.use('/discharges', dischargesRouter);
routes.use('/enrollments', enrollmentsRouter);
routes.use('/grades', gradesRouter);
routes.use('/payments', paymentsRouter);
routes.use('/persons', personsRouter);
routes.use('/profiles', profilesRouter);
routes.use('/relationships', relationshipsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/students', studentsRouter);
routes.use('/users', usersRouter);

export default routes;
