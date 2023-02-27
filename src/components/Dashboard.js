import React, { useState } from "react";
import { UserInfo } from './UserInfo';
import { Countries } from './Countries';
import { Button, Space, Layout } from 'antd';
import { contentStyle, headerStyle } from "../common";
const { Header, Content } = Layout;

export const Dashboard = ( { userInfo } ) => {
  const [countries, setCountries] = useState();
  const [countriesFiltered, setCountriesFiltered] = useState();

  const getCountries = () => {
    fetch('https://restcountries.com/v2/all?fields=name,capital,currencies')
      .then((res) => res.json())
      .then((data) => {
        setCountries(() => data.slice(0, 10));
        setCountriesFiltered(() => data.slice(0, 10));
        console.log(countries)
      });
  };

  const handleDelete = (deleteKeys) => {
    const newData = countries.filter(country => !deleteKeys.includes(country.name));
    setCountries(() => newData);
    setCountriesFiltered(() => newData);
  }

  const handleFilter = (filterKey) => {
    const filteredVals = countries.filter(entry =>
      entry.name.includes(filterKey)
    )
    setCountriesFiltered(filteredVals)
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout style={{height:"100vh"}}>
        <Header style={headerStyle} >
             Dashboard
        </Header>
        <Content style={contentStyle}>
          <UserInfo data={userInfo}/>
          <Button type="primary" onClick={getCountries}>
            Display all countries
          </Button>
          {countries && <Countries data={countriesFiltered} handleDelete={handleDelete} handleFilter={handleFilter}/>}
        </Content>
      </Layout>
    </Space>
  );
};