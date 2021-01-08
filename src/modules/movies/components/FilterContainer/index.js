import React from 'react';

// antd
import { Form, Select, Button, Row } from 'antd';

// redux
import { useDispatch } from 'react-redux';
import { getMovieList, setMovieList, setLoading } from '@redux/actions';

// utils
import { genreList, yearList } from '../../utils';

// styling
import './index.less';

const { Option } = Select;

const FilterContainer = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleGenreChange = (e) => {
    const selectedYear = form.getFieldValue('year');
    dispatch(getMovieList(''))
    .then((res) => {
      const filtered = res.filter(movie => {
        return !selectedYear
        ? movie.genre === e
        : movie.genre === e && movie.productionYear === +selectedYear;
      });
      dispatch(setMovieList(filtered));
    })
    .catch(err => {
      form.resetFields();
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
  };

  const handleYearChange = (e) => {
    const selectedGenre = form.getFieldValue('genre');
    dispatch(getMovieList(''))
    .then((res) => {
      const filtered = res.filter(movie => {
        return !selectedGenre
        ? movie.productionYear === +e
        : movie.productionYear === +e && movie.genre === selectedGenre
      });
      dispatch(setMovieList(filtered));
    })
    .catch(err => {
      form.resetFields();
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
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
