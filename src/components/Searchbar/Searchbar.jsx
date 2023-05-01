import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import {
  Header,
  SearchForm,
  SearchButton,
  Input,
  SearchIcon,
  ErrMessage,
} from './Searchbar.styled';

const SearchSchema = Yup.object().shape({
  searchQuery: Yup.string().trim().required('Please, enter a search query!'),
});

export const Searchbar = ({ onSubmit }) => {
  return (
    <Header>
      <Formik
        initialValues={{ searchQuery: '' }}
        validationSchema={SearchSchema}
        onSubmit={(values, actions) => {
          onSubmit(values);
        }}
      >
        <SearchForm>
          <SearchButton type="submit">
            <SearchIcon />
          </SearchButton>
          <Input
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <ErrMessage name="searchQuery" component="div" />
        </SearchForm>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};