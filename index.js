const sesam = {
    initialize() {
        console.log('\n' + `%c[service] sesam.js initialize() running! \n` + ' ', 'color: #00d400; font-weight: bold');
        console.log(`%c[service] initialize()`, 'font-weight: bold');
        this.cached();

        this.sesamTrigger.length !== 0 ? console.log(`\sesam triggers available`) : console.log(`\tno collapse triggers`);
        this.sesamTrigger.forEach((trigger) => {
            trigger.addEventListener("click", (() => {this.collapseDo(trigger.dataset.sesamTrigger)}));
            
            if (trigger.classList.contains('sesam-hidden') == false && trigger.classList.contains('sesam-show') == false) trigger.classList.add('sesam-hidden');
            if (trigger.classList.contains('sesam') == false) trigger.classList.add('sesam');
        });

        this.sesamTarget.forEach((target) => {
            if (target.classList.contains('sesam-hidden') == false && target.classList.contains('sesam-show') == false) target.classList.add('sesam-hidden');
            if (target.classList.contains('sesam') == false) target.classList.add('sesam');
        })
    },

    cached() {
        console.log(`%c[service] cached()`, 'font-weight: bold');

        // Put cache elements here
        this.sesamTrigger = document.querySelectorAll('[data-sesam-trigger]');
        this.sesamTarget = document.querySelectorAll('[data-sesam-target]');
        this.parent = '';
        this.targetName = '';
        this.trigger;
    },

    collapseDo(target) {
        console.log(`%c[service] collapseDo(${target})`, 'font-weight: bold');

        this.targetName = target;
        target = document.querySelector(`[data-sesam-target='${target}']`);

        this.parent = target.dataset.sesamParent;
        this.parent = document.querySelectorAll(`[data-sesam-group="${this.parent}"] .sesam`);
        this.trigger = document.querySelector(`[data-sesam-trigger="${this.targetName}"]`);

        // COLLAPSE TRIGGER
        if (this.trigger.classList.contains('sesam-show') == false) {
            this.itemShow(this.trigger);

            // HIDE ALSO OTHER ELEMENTS
            this.parent.forEach((item) => {
                if (item.dataset.sesamTrigger !== this.targetName) this.itemHide(item);
            });
        } else {
            this.itemHide(this.trigger);
        }

        // COLLAPSE TARGET
        if (target.classList.contains('sesam-show') == false) {
            this.itemShow(target)
        } else {
            this.itemHide(target)

            // HIDE ALSO OTHER ELEMENTS
            this.parent.forEach((item) => {
                if (item.dataset.sesamTarget !== this.targetName) this.itemHide(item);
            });
        }
    },

    itemHide(el) {
        el.classList.remove('sesam-show');
        el.classList.add('sesam-hidden');
    },

    itemShow(el) {
        el.classList.add('sesam-show');
        el.classList.remove('sesam-hidden');
    },

    hideChildren(input) {
        // input = the dataset for trigger or target
        this.parent.forEach((item) => {
            if (item.datatset.input !== this.targetName) this.itemHide(item);
        });
    },

    ifClassFalseAddClass(itemToApply = item, checkThisClass) {
        if (itemToApply.classList.contains(checkThisClass) == false) itemToApply.classList.add(checkThisClass);
    }
}

module.exports.sesam = sesam;