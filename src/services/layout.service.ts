

export function getNotesButtonClassName(toggle:boolean){

    const className: string[] = ['control-button'];

    toggle && className.push('');

    const classNameUnited = className.join(' ');
    return classNameUnited;

}