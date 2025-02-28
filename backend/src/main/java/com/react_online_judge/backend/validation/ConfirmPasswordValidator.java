package com.react_online_judge.backend.validation;

import com.react_online_judge.backend.dto.request.AccountUpdateRequest;
import com.react_online_judge.backend.dto.request.UserUpdateRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ConfirmPasswordValidator implements ConstraintValidator<PasswordConfirm, AccountUpdateRequest> {

    @Override
    public void initialize(PasswordConfirm constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(AccountUpdateRequest request, ConstraintValidatorContext constraintValidatorContext) {
        if (request.getNewPassword() == null || request.getNewPassword().isBlank()) {
            return true;
        }
        return request.getNewPassword().equals(request.getConfirmPassword());
    }
}
