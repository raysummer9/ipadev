import React, { useState } from 'react';
import './ContactForm.css';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const initialErrors = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePhone = (phone) => /^\+?\d{7,15}$/.test(phone.replace(/\s/g, ''));

const ContactForm = () => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validate = () => {
    const newErrors = { ...initialErrors };
    if (!values.firstName) newErrors.firstName = 'First name is required.';
    if (!values.lastName) newErrors.lastName = 'Last name is required.';
    if (!values.email) newErrors.email = 'Email is required.';
    else if (!validateEmail(values.email)) newErrors.email = 'Invalid email address.';
    if (!values.phone) newErrors.phone = 'Phone is required.';
    else if (!validatePhone(values.phone)) newErrors.phone = 'Invalid phone number.';
    if (!values.subject) newErrors.subject = 'Subject is required.';
    if (!values.message) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ firstName: true, lastName: true, email: true, phone: true, subject: true, message: true });
    const validationErrors = validate();
    setErrors(validationErrors);
    setSubmitted(true);
    if (Object.values(validationErrors).every((v) => !v)) {
      // Submit form (e.g., send to API)
      alert('Form submitted!');
      setValues(initialState);
      setTouched({});
      setSubmitted(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__row">
        <div className="contact-form__field">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.firstName}
            aria-describedby="firstName-error"
          />
          {touched.firstName && errors.firstName && (
            <span className="contact-form__error" id="firstName-error">{errors.firstName}</span>
          )}
        </div>
        <div className="contact-form__field">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.lastName}
            aria-describedby="lastName-error"
          />
          {touched.lastName && errors.lastName && (
            <span className="contact-form__error" id="lastName-error">{errors.lastName}</span>
          )}
        </div>
      </div>
      <div className="contact-form__row">
        <div className="contact-form__field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
          />
          {touched.email && errors.email && (
            <span className="contact-form__error" id="email-error">{errors.email}</span>
          )}
        </div>
        <div className="contact-form__field">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter Phone Number"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.phone}
            aria-describedby="phone-error"
          />
          {touched.phone && errors.phone && (
            <span className="contact-form__error" id="phone-error">{errors.phone}</span>
          )}
        </div>
      </div>
      <div className="contact-form__field contact-form__field--full">
        <label>Subject</label>
        <input
          type="text"
          name="subject"
          placeholder="Enter your Subject"
          value={values.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.subject}
          aria-describedby="subject-error"
        />
        {touched.subject && errors.subject && (
          <span className="contact-form__error" id="subject-error">{errors.subject}</span>
        )}
      </div>
      <div className="contact-form__field contact-form__field--full">
        <label>Message</label>
        <textarea
          name="message"
          placeholder="Enter your Message here..."
          rows={5}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.message}
          aria-describedby="message-error"
        ></textarea>
        {touched.message && errors.message && (
          <span className="contact-form__error" id="message-error">{errors.message}</span>
        )}
      </div>
      <div className="contact-form__actions">
        <button type="submit" className="contact-form__submit">Send Your Message</button>
      </div>
      {submitted && Object.values(errors).some((v) => v) && (
        <div className="contact-form__error contact-form__error--form">Please fix the errors above and try again.</div>
      )}
    </form>
  );
};

export default ContactForm; 