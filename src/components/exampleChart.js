import React, { useState, useEffect, useLayoutEffect , useRef} from 'react';
import { DATA } from './ftreeData';
import { OrgChartComponent } from './OrgChart';
import * as d3 from 'd3'
 

const ExampleChart = (props) => {
const [data, setData] = useState(null);
const treeContainer = useRef(null)


  return (
    <div className = "tree-container"
    ref = {treeContainer}>
      <OrgChartComponent
        obj = {treeContainer}
        data= {DATA}
        orientation = {props.orientation}
        setAncestor = {props.setAncestor}
        ancestor = {props.ancestor}
      />
       
    </div>
  );
};


export default ExampleChart
