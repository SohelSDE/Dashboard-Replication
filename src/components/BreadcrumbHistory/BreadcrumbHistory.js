import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { v4 as uuid } from 'uuid';

const BreadcrumbHistory = ({ url }) => {
  const renderBreadCrumbs = () => {
    if (!url) {
      return null;
    }

    const route = url
      .split('/')
      .slice(1)
      .map(route =>
        route
          .split('-')
          .map(word => word[0].toUpperCase() + word.slice(1))
          .join(' ')
      );

    return (
      <>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        {route.map((item, index) => (
          <BreadcrumbItem key={uuid()} active={index === route.length - 1}>
            <strong>{item}</strong>
          </BreadcrumbItem>
        ))}
      </>
    );
  };

  return (
    <>
      {url !== '/app/chat' && (
        <div>
          <Breadcrumb tag="nav" listTag="div">
            {renderBreadCrumbs()}
          </Breadcrumb>
        </div>
      )}
    </>
  );
};

export default BreadcrumbHistory;
