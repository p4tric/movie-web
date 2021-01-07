import React from 'react';

// antd
import { Form, Select, Button, Row } from 'antd';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getMovieList, setMovieList, setLoading } from '@redux/actions';

// utils
import { genreList, yearList } from '../../utils';

// styling
import './index.less';

const { Option } = Select;

const FilterContainer = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { movies } = useSelector(state => state);

  const handleGenreChange = (e) => {
    if (!form.getFieldValue('year')) {
      dispatch(getMovieList(''))
      .then((res) => {
        const filtered = res.filter(movie => movie.genre === e);
        dispatch(setMovieList(filtered));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
    } else {
      const filtered = movies.filter(movie => movie.genre === e);
      dispatch(setMovieList(filtered));
    }
  };

  const handleYearChange = (e) => {
    if (!form.getFieldValue('genre')) {
      dispatch(getMovieList(''))
      .then((res) => {
        const filtered = res.filter(movie => movie.productionYear === +e);
        dispatch(setMovieList(filtered));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
    } else {
      const filtered = movies.filter(movie => movie.productionYear === +e);
      dispatch(setMovieList(filtered));
    }
  };

  const handleClearFilter = () => {
    form.resetFields();
    dispatch(getMovieList(''))
    .then()
    .finally(() => {
      dispatch(setLoading(false));
    });
  };

  return (
    <Row justify="end" className="filter-container">
      <Form
        layout="inline"
        form={form}
      >
        <Form.Item label="Filter By Genre" name="genre">
          <Select style={{ width: 220 }} onChange={handleGenreChange}>
            {genreList.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Filter By Year" name="year">
          <Select style={{ width: 220 }} onChange={handleYearChange}>
            {yearList.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Button type="primary" onClick={handleClearFilter}>
          Clear Filters
        </Button>

      </Form>
    </Row>
  );
};

export default FilterContainer;
