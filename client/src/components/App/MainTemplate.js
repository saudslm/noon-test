import React, {useContext} from 'react';
import { Route, Switch } from 'react-router-dom';

import {AppContext} from '../../context/AppContext';
import Catalog from '../../pages/Catalog';
import Alert from '../Alert';

const MainTemplate = () => {
  const {error} = useContext(AppContext);

  return (
    <div className="container">
      <div className="app-wrapper">
        <div className="main">
          <Switch>
            <Route exact path="/" component={Catalog} />

            {/*<Route>
              <NoMatch />
            </Route>*/}
          </Switch>
        </div>
      </div>
      {/*error && error.message.length > 0 && <Alert error={error} />*/}
    </div>
  );
}

export default MainTemplate;