import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { CustomerIndex } from "./components/customer/CustomerIndex";
import { ProductIndex } from "./components/product/ProductIndex";
import { StoreIndex } from "./components/store/StoreIndex";
import { SalesIndex } from "./components/sales/SalesIndex";
import { FlavorForm } from './components/sales/FlavorForm';

export default class App extends Component {
  static displayName = App.name;

  
  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/customer' component={CustomerIndex} />
        <Route path='/product' component={ProductIndex} />
        <Route path='/store' component={StoreIndex} />
        <Route path='/sales' component={SalesIndex} />
        <Route path='/flavorform' component={FlavorForm} />

      </Layout>
    );
  }
}
