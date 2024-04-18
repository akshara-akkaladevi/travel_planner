import React from "react";
import { CFooter } from '@coreui/react'
import { CLink } from '@coreui/react';
import dynamic from 'next/dynamic';

export function Footer() {
    return (
      <CFooter>
        <div className="m-4">
            Made by&nbsp;
          <a href="https://github.com/athxrva1">Atharva Dagaonkar</a>
          &nbsp;and&nbsp;
          <a href="https://github.com/akshara-akkaladevi">Akshara Akkaladevi</a>
        </div>
        <div className="m-4">
          <span>Powered by</span>
          &nbsp;
          <a href="https://nextjs.org">NextJs</a>
        </div>
      </CFooter>
    );
  }