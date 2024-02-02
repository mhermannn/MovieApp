import React, { useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EditMovie = ({ onSubmit, initialData, handleUpdateMovie }) => {
  const titleInputRef = useRef(null);
  const overviewInputRef = useRef(null);
  const originalLanguageInputRef = useRef(null);
  const runtimeInputRef = useRef(null);
  const releaseDateInputRef = useRef(null);
  const taglineInputRef = useRef(null);
  const budgetInputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      titleInputRef.current.focus();
    }
  }, [initialData]);

  return (
    <div>
      <h2>{initialData ? 'Edit Movie' : 'Add Movie'}</h2>
      <Formik
        initialValues={{
          title: initialData ? initialData.title || '' : '',
          overview: initialData ? initialData.overview || '' : '',
          original_language: initialData ? initialData.original_language || '' : '',
          runtime: initialData ? initialData.runtime || '' : '',
          release_date: initialData ? initialData.release_date || '' : '',
          tagline: initialData ? initialData.tagline || '' : '',
          budget: initialData ? initialData.budget || '' : '',
        }}
        validationSchema={Yup.object({
          title: Yup.string().required('Title is required'),
          overview: Yup.string().required('Overview is required'),
          original_language: Yup.string().required('Original Language is required'),
          runtime: Yup.string().required('Runtime is required'),
          release_date: Yup.string().required('Release Date is required'),
          tagline: Yup.string().required('Tagline is required'),
          budget: Yup.string().required('Budget is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          handleUpdateMovie(values, initialData.idd);
          setSubmitting(false);
        }}
        
      >
        <Form>
          <label htmlFor="title">Title:</label>
          <Field type="text" name="title" innerRef={titleInputRef} />
          <ErrorMessage name="title" component="div" />

          <label htmlFor="overview">Overview:</label>
          <Field as="textarea" name="overview" innerRef={overviewInputRef} />
          <ErrorMessage name="overview" component="div" />

          <label htmlFor="original_language">Original Language:</label>
          <Field type="text" name="original_language" innerRef={originalLanguageInputRef} />
          <ErrorMessage name="original_language" component="div" />

          <label htmlFor="runtime">Runtime:</label>
          <Field type="text" name="runtime" innerRef={runtimeInputRef} />
          <ErrorMessage name="runtime" component="div" />

          <label htmlFor="release_date">Release Date:</label>
          <Field type="date" name="release_date" innerRef={releaseDateInputRef} />
          <ErrorMessage name="release_date" component="div" />

          <label htmlFor="tagline">Tagline:</label>
          <Field type="text" name="tagline" innerRef={taglineInputRef} />
          <ErrorMessage name="tagline" component="div" />

          <label htmlFor="budget">Budget:</label>
          <Field type="text" name="budget" innerRef={budgetInputRef} />
          <ErrorMessage name="budget" component="div" />

          <button type="submit">Update Movie</button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditMovie;
