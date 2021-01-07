import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

// layout
import MainLayout from '@layout/MainLayout';

// component
import { Movies } from '@modules';

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Route path="/" component={Movies} exact />
        <Route path='/movies' component={Movies}/>
      </MainLayout>

    </BrowserRouter>
  );
}

export default App;
