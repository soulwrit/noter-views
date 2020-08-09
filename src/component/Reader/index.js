import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SlotProvider, Slot, ViewBox, ViewArea } from '@writ/react';

import Layout from './Layout';
import { views } from './viewConfig';
import Sidebar from './Module/Sidebar';

const ReaderLogic = memo(function RLogic(props) {
   const { viewKey } = props;

   return (
      <ViewBox.Provider>
         <SlotProvider>
            <Slot name='sidebar'>
               <Sidebar />
            </Slot>
            <ViewBox name='reader' path={viewKey}>
               {views.map(view => <ViewArea path={view.key} key={view.key} component={view.component} />)}
            </ViewBox>
            <Layout></Layout>
         </SlotProvider>
      </ViewBox.Provider>
   );
});
ReaderLogic.defaultProps = {
   fileSearcherVisible: false
};
if (window.DEV) {
   ReaderLogic.propTypes = {
      fileSearcherVisible: PropTypes.bool
   };
}
const mapStateToProps = ({ reader }, ) => {
   return {
      fileSearcherVisible: reader.searcher.visible,
      viewKey: reader.layout.viewKey
   };
};
const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(ReaderLogic);