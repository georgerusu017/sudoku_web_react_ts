

export function getNotesToggleClassName(toggle:boolean){

    const className: string[] = ['notesToggle'];

    toggle && className.push('notes_toggle_selected');

    const classNameUnited = className.join(' ');
    return classNameUnited;

}