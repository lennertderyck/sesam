const sesamCollapse = {
    initialize() {
        console.log('\n' + `%c[service] sesam.js initialize() running! \n` + ' ', 'color: #00d400; font-weight: bold');
        console.log(`%c[service] initialize()`, 'font-weight: bold');
        
        this.cache();
        this.listen();
        
        this.domSetup(this.triggers);
        this.domSetup(this.targets);
        
        if (this.backdrop == null) this.addBackdrop();
    },
    
    listen() {
        document.body.addEventListener('click', (event) => {
            const trigger = event.target.closest('[data-sesam-trigger]');
            
            if (trigger != null) {
                this.collapse(trigger);
                const targets = document.querySelectorAll(`[data-sesam-target="${trigger.dataset.sesamTrigger}"]`);
                targets.forEach(i => {this.collapse(i)});
            }
        });
    },

    cache() {
        this.triggers = document.querySelectorAll('[data-sesam-trigger]');
        this.targets = document.querySelectorAll('[data-sesam-target]');
        this.backdrop = document.querySelector('[data-label="sesamBackdrop"]');
    },

    domSetup(elements) {
        elements.forEach(i => {
            i = i.classList;
            if (!i.contains('sesam')) i.add('sesam');
            if (!i.contains('sesam-hidden') && !i.contains('sesam-show')) i.add('sesam-hidden');
        });
    },
    
    collapse(element) {
        const itemState = this.itemState(element);
        
        if (itemState == true) this.itemShow(element);
        else this.itemHide(element);
                
        // execute if collapse element is target
        if (element.dataset.sesamTarget != undefined && itemState == true) {
            element.dataset.sesamBackdrop == 'true' ? this.itemShow(this.backdrop) : null;
            element.dataset.sesamScrollblock == 'true' ? this.scrollBlock({ block: true }) : null;
            element.dataset.sesamParent != undefined ? this.hideOtherChildren(element) : null;
            
            if (element.dataset.sesamOptions != undefined) {
                this.targetOptions(element);
                this.optionsMap.get('backdrop') == 'true' ? this.itemShow(this.backdrop) : null;
                this.optionsMap.get('scrollBlock') == 'true' ? this.scrollBlock({ block: true }) : null;
                // this.optionsMap.has('parent') == true ? this.hideOtherChildren(this.optionsMap.get('parent')) : null;
            }
        } else if (element.dataset.sesamTarget != undefined && itemState == false) {
            this.itemHide(this.backdrop);
            this.scrollBlock({ block: false });
        }
    },
    
    itemState(element) {
        return element.classList.contains('sesam-hidden');
    },
    
    targetOptions(element) {
        const options = element.dataset.sesamOptions.split(',');
        this.optionsMap = new Map();
        
        options.forEach(i => {
            i = i.split(':');
            this.optionsMap.set(i[0].replace(' ',''), i[1]);
        });
    },
    
    hideOtherChildren(element) {
        const otherChildren = document.querySelectorAll(`[data-sesam-group="${element.dataset.sesamParent}"] .sesam:not([data-sesam-target="${element.dataset.sesamTarget}"]):not([data-sesam-trigger="${element.dataset.sesamTarget}"])`);
        otherChildren.forEach(i => {
            this.itemHide(i);
        })
    },
    
    itemHide(element) {
        element.classList.remove('sesam-show');
        element.classList.add('sesam-hidden');
    },
    
    itemShow(element) {
        element.classList.add('sesam-show');
        element.classList.remove('sesam-hidden');
    },
    
    addBackdrop() {
        this.backdrop = document.createElement('div');
        this.backdrop.setAttribute('data-label','sesamBackdrop');
        this.backdrop.classList.add('sesam','sesam-hidden','sesam-backdrop');
        document.body.appendChild(this.backdrop);
    },
    
    scrollBlock({ block }) {
        if (block == true) document.body.classList.add('sesam-scrollBlock');
        else document.body.classList.remove('sesam-scrollBlock');
    }
}, sesam = ({action, collapse, execute, classes, target, modal}, callback) => {
    target = document.querySelector(`[data-sesam-target='${target}']`);
    action != undefined && action == 'show' ? sesamCollapse.itemShow(target) : null;
    action != undefined && action == 'hide' ? sesamCollapse.itemHide(target) : null;
    collapse != undefined && collapse == true ? sesamCollapse.collapse(target) : null;
    if (modal != undefined && modal.backdrop !== undefined) {
        modal.backdrop == true ? sesamCollapse.itemShow(sesamCollapse.backdrop) : null;
        modal.backdrop == false ? sesamCollapse.itemHide(sesamCollapse.backdrop) : null;
    }
    if (modal!= undefined && modal.scrollBlock !== undefined) {
        modal.scrollBlock == true ? sesamCollapse.scrollBlock({ block: true }) : null;
        modal.scrollBlock == false ? sesamCollapse.scrollBlock({ block: false }) : null;
    }
    
    callback ? callback() : null;
};

export {sesamCollapse, sesam};

/*
sesam({
    target: 'example', //doet dit: document.querySelector(`[data-sesam-target='${example}']`)
    collapse: true, // gaat gewoon kijken wat de huidige state is van een target en die veranderen
    action: 'show', // of 'hide', niet gebruiken in combinatie met collapse argument
    execute: (() => { // voer extra javascript uit
        console.log('this works!')
    })(), 
    classes: {
        add: ['add','some','classes'],
        remove: ['remove','some','classes']
    },
    modal: {
        backdrop: true, // voegt sesam-hidden/sesam-show classe toe aan het backdrop element, 
                        //backdrop element wordt automatisch gemaakt bij het initialiseren
        scrollBlock: true // blokkeert het scrollen door de pagina wanneer deze modal getoont wordt
    }
})
*/