import React, { useRef, useEffect, useCallback, useState } from 'react';
import Rickshaw from 'rickshaw';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const RickshawGraph = ({ height, sidebarVisibility }) => {
  const rickshawChartRef = useRef(null);
  const [graph, setGraph] = useState(null);

  const onResizeRickshaw = useCallback(() => {
    graph.configure({ height });
    graph.render();
  }, [graph, height]);

  const initRickshaw = useCallback(() => {
    const seriesData = [[], []];
    const random = new Rickshaw.Fixtures.RandomData(30);
    for (let i = 0; i < 30; i += 1) {
      random.addData(seriesData);
    }

    const newGraph = new Rickshaw.Graph({
      element: rickshawChartRef.current,
      height,
      series: [
        {
          color: '#2477FF',
          data: seriesData[0],
          name: 'Uploads',
        },
        {
          color: '#2D8515',
          data: seriesData[1],
          name: 'Downloads',
        },
      ],
    });

    const hoverDetail = new Rickshaw.Graph.HoverDetail({
      graph: newGraph,
      xFormatter: (x) => new Date(x * 1000).toString(),
    });

    hoverDetail.show();

    setInterval(() => {
      random.removeData(seriesData);
      random.addData(seriesData);
      newGraph.update();
    }, 1000);

    newGraph.render();
    setGraph(newGraph);
  }, [height]);

  useEffect(() => {
    initRickshaw();
    window.addEventListener('resize', onResizeRickshaw);

    return () => {
      window.removeEventListener('resize', onResizeRickshaw);
      if (graph) {
        return !graph
      }
    };
  }, [initRickshaw, onResizeRickshaw, graph]);

  useEffect(() => {
    if (graph && sidebarVisibility) {
      onResizeRickshaw();
    }
  }, [graph, sidebarVisibility, onResizeRickshaw]);

  return <div ref={rickshawChartRef} />;
};

RickshawGraph.propTypes = {
  height: PropTypes.number,
  sidebarVisibility: PropTypes.bool,
};

RickshawGraph.defaultProps = {
  height: 100,
  sidebarVisibility: false,
};

const mapStateToProps = (store) => ({
  sidebarVisibility: store.navigation.sidebarVisibility,
});

export default connect(mapStateToProps)(RickshawGraph);
