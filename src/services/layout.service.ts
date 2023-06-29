

export function getNotesButtonClassName(toggle:boolean){

    const className: string[] = ['control-button'];

    toggle && className.push('notesToggle');

    const classNameUnited = className.join(' ');
    return classNameUnited;

}