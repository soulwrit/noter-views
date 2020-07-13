import React from 'react';
import { Icon } from '../lib';

export default class NotFound extends React.PureComponent {
   render() {
      return (
         <div>
            <p> <Icon type="view-list" /> 页面走丢了...</p>
         </div>
      );
   }
}