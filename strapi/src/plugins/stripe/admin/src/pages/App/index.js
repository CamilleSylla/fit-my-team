/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { NotFound } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';
import { Typography, Box } from "@strapi/design-system";
import Navigation from '../../components/Nav/Navigation';
import ProductListPage from '../Product/List';


const App = () => {
  return (
    <div style={{display: "flex"}}>
      <Navigation/>
      {/* <Box padding={8}>
      <Typography  variant="alpha">{pluginId.toUpperCase()}</Typography>
      </Box> */}
      <Switch>
        <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
        <Route path={`/plugins/${pluginId}/product/list`} component={ProductListPage} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
