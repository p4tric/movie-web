import React, { useCallback, useEffect, useMemo, useState } from 'react';

// antd
import { message, Empty } from 'antd';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getMovieList, setLoading } from '@redux/actions';

// components
import MovieItem from '../../components/MovieItem';
import FilterContainer from '../../components/FilterContainer';

const MovieGridSection = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector(state => state);
  const [list, setList] = useState([]);

  const handleGetMovieList = useCallback(() => {
    dispatch(getMovieList(''))
    .then(res => {
      setList(res);
    })
    .catch(err => message.error('Server Error: ', err))
    .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  useEffect(() => {
    handleGetMovieList();
  }, [handleGetMovieList]);

  const filtered = useMemo(() => {
    if (movies) {
      return movies;
    }
  }, [movies]);

  useEffect(() => {
    if (filtered) {
      setList(filtered);
    }
  }, [filtered]);

  if (!list) return null;

  return (
    <>
      <FilterContainer />

      {list.length === 0 ? (
        <Empty description="No movies found."/>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          {list.map((item, idx) => <MovieItem movie={item} key={idx} />)}
        </div>
      )}
    </>
  );
};

export default MovieGridSection;
