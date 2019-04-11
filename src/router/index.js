import React, { Suspense } from 'react'

import {
  Route,
  Switch,
  Redirect,
  Router,
} from 'react-router-dom'

import history from '../utils/history'

import Authorized from '../components/Authorized'
import BaseLayout  from '../layouts/BaseLayout'
import DetailsLayout from'../layouts/DetailsLayout'

import PageLoading from './../components/PageLoading'

const HomePage = React.lazy(() => import('../views/HomePage'))

const LoginPage = React.lazy(() => import('../views/LoginPage'))
const NoFind = React.lazy(() => import('../components/NoFind'))
const NoPermission = React.lazy(() => import('../components/NoPermission'))

const EventList = React.lazy(() => import('../views/EventList'))
const MyTask = React.lazy(() => import('../views/MyTask'))

const NoticeList = React.lazy(() => import('../views/NoticeList'))
const SetNotice = React.lazy(() => import('../views/SetNotice'))

const UniteMonitor = React.lazy(() => import('../views/UniteMonitor'))

const EnergyAnalysis = React.lazy(() => import('../views/EnergyAnalysis'))
const EnergyDetail = React.lazy(() => import('../views/EnergyDetail'))

export default () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/home" render={props =>
          <Authorized {...props}>
            <BaseLayout>
              <Suspense fallback={ <PageLoading /> }>
                <Route exact path="/home" component={ HomePage } />
              </Suspense>
            </BaseLayout>
          </Authorized>
        }/>
        <Route path="/eventMana" render={props =>
          <Authorized {...props}>
            <BaseLayout>
              <Suspense fallback={ <PageLoading /> }>
                <Route exact path="/eventMana/" component={ EventList } />
                <Route exact path="/eventMana/myTask" component={ MyTask } />
              </Suspense>
            </BaseLayout>
          </Authorized>
        }/>
        <Route path="/infoMana" render={props =>
          <Authorized {...props}>
            <BaseLayout>
              <Suspense fallback={ <PageLoading /> }>
                <Route exact path="/infoMana/" component={ NoticeList } />
                <Route exact path="/infoMana/setNotice" component={ SetNotice } />
              </Suspense>
            </BaseLayout>
          </Authorized>
        }/>
        <Route path="/uniteMonitor" render={props =>
          <Authorized {...props}>
            <BaseLayout>
              <Suspense fallback={ <PageLoading /> }>
                <Route exact path="/uniteMonitor/" component={ UniteMonitor } />
              </Suspense>
            </BaseLayout>
          </Authorized>
        }/>
        <Route path="/energyAnalysis" render={props =>
          <Authorized {...props}>
            <BaseLayout>
              <Suspense fallback={ <PageLoading /> }>
                <Route exact path="/energyAnalysis/" component={ EnergyAnalysis } />
                <Route exact path="/energyAnalysis/energyDetail" component={ EnergyDetail } />
              </Suspense>
            </BaseLayout>
          </Authorized>
        }/>
        <Route path="/detail" render={props =>
          <Authorized {...props}>
            <DetailsLayout>
              <Suspense fallback={ <PageLoading /> }>
                <Route exact path="/detail/event/:id" component={ EnergyAnalysis} />
              </Suspense>
            </DetailsLayout>
          </Authorized>
        }/>
        <Suspense fallback={ <PageLoading /> }>
          <Route exact path="/login" component={ LoginPage }/>
          <Route exact path="/403" component={ NoPermission }/>
          <Route exact path="/" render={() => (
              <Redirect to="/home" />
            )}/>
        </Suspense>
        <Route path="*" component={ NoFind }/>
      </Switch>
    </Router>
  )
}
