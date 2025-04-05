export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email)
}

export const getInitials = (name) => {

    if(!name) return "";

    const words = name.split(" ");
    
    let initials = "";

    words.forEach(word => {
        initials += word[0];
    });
    
    return initials.toUpperCase();
}