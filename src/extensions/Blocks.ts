import {Extension, Node, mergeAttributes, wrappingInputRule } from '@tiptap/core'
import TheoremLike from './TheoremLike'
import AxiomLike from './AxiomLike'


const Para = Node.create({
  name: 'para',

  content: 'inline*',

  group: 'block',

//   selectable: false,

  draggable: true,

  defining: false,

  parseHTML() {
    return [
      {
        tag: 'p',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ class: 'para', label: 'p' }, HTMLAttributes), 0]
  },

  addInputRules() {
    return [
      wrappingInputRule({
        find: new RegExp(`^#p\\s$`),
        type: this.type,
      }),
    ]
  },

})


const Blocks = Extension.create({
  name: 'blocks',

  addExtensions() {
    return [
        Para,
        TheoremLike,
        AxiomLike,
    ]
  },
})

export default Blocks;
