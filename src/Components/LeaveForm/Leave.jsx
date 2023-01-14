import React from "react";
import "../../leave.scss";
const Leave = () => {
  const handleSubmit = () => {};
  return (
    <form className="react-form" onSubmit={handleSubmit}>
      <h1>Say Hi!</h1>

      <fieldset className="form-group">
        <ReactFormLabel htmlFor="formName" title="Full Name:" />

        <input
          id="formName"
          className="form-input"
          name="name"
          type="text"
          required
          //   onChange={handleChange}
          //   value={this.state.name}
        />
      </fieldset>

      <fieldset className="form-group">
        <ReactFormLabel htmlFor="formEmail" title="Email:" />

        <input
          id="formEmail"
          className="form-input"
          name="email"
          type="email"
          required
          //   onChange={this.handleChange}
          //   value={this.state.email}
        />
      </fieldset>

      <fieldset className="form-group">
        <ReactFormLabel htmlFor="formSubject" title="Subject:" />

        <input
          id="formSubject"
          className="form-input"
          name="subject"
          type="text"
          required
          //   onChange={this.handleChange}
          //   value={this.state.subject}
        />
      </fieldset>

      {/* <fieldset className="form-group">
        <ReactFormLabel htmlFor="formMessage" title="Message:" />

        <textarea
          id="formMessage"
          className="form-textarea"
          name="message"
          required
          onChange={this.handleChange}
        ></textarea>
      </fieldset> */}

      <div className="form-group">
        <input
          id="formButton"
          className="btn"
          type="submit"
          placeholder="Send message"
        />
      </div>
    </form>
  );
};

const ReactFormLabel = (props) => {
  return <label htmlFor={props.htmlFor}>{props.title}</label>;
};

export default Leave;
