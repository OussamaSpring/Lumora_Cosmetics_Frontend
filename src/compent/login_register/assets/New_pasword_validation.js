import React from 'react';

function new_password(data_password) {
    const errors = {};

    if (!data_password.password) {
        errors.password = "Password is required";
    } else if (data_password.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data_password.password)) {
        errors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    if (!data_password.confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
    } else if (data_password.confirmPassword !== data_password.password) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
}

export default new_password;

