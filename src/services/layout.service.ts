

export function getNotesToggleClassName(toggle:boolean){

    const className: string[] = ['notesToggle'];

    toggle && className.push('notes_toggle_selected');

    const classNameUnited = className.join(' ');
    return classNameUnited;

}

export function getPauseButtonClassName(toggle:boolean){
    let className: string = 'unpause-button';

    toggle && (className = 'pause-button');

    return className;
}

export function getGameBoardClassName(toggle:boolean){
    let className: string = 'img-paused';

    toggle && (className = '');

    return className;
}

