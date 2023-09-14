function Form({ onValChange, formObject, onFormSubmit }) {
    return (
        <div className="row mb-4">
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    onChange={onValChange}
                    value={formObject.name}
                    name="name"
                />
            </div>
            <div className="mb-3">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={onValChange}
                    value={formObject.email}
                    name="email"
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Profile"
                    onChange={onValChange}
                    value={formObject.profile}
                    name="profile"
                />
            </div>
            <div className="d-grid">
                <input
                    type="submit"
                    onClick={onFormSubmit}
                    className="btn btn-success"
                />
            </div>
        </div>
    );
}
export default Form;