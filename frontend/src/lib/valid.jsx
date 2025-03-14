function valid(field, type, condition, message) {
    switch (type) {
        case "text":
            if (condition.maxLength)
                if (field.length > condition.maxLength || field.length < condition.minLength) {
                    alert(message ? message : "You must type at least between " + condition.minLength + " to " + condition.maxLength + " characters")
                    return false
                } else
                    return field
            else
                if (field.length < condition.minLength) {
                    alert(message ? message : "You must type at least " + condition.minLength + " character(s)")
                    return false;
                } else
                    return field
            break;
        case "password":
            if (condition.maxLength)
                if (field.length > condition.maxLength || field.length < condition.minLength) {
                    alert(message ? message : "Your password must be at least between " + condition.minLength + " to " + condition.maxLength + " characters")
                    return false
                } else
                    return field
            else
                if (field.length < condition.minLength) {
                    alert(message ? message : "Your password must be at least " + condition.minLength + " character(s)")
                    return false
                } else
                    return field
            break;
        case "email":
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;     
            if (emailRegex.test(field)) {
                return field;
            } else {
                alert(message ? message : "Your email address is invailid")
                return false
            }
            break;
        case "file":
            if (condition.mimeTypes) {
                if (condition.mimeTypes.includes(field.type)) {
                    return field
                } else {
                    alert(message ? message : "Your file's type isn't valid'")
                    return false
                }
            }
            if (condition.maxSize) {
                if (field.size > condition.maxSize) {
                    alert(message ? message : "Your file is too large")
                    return false
                } else {
                    return field
                }
            }            
            break;
        default:
            alert("Invalid input type");
            return false;
    }
}