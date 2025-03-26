import { Node, mergeAttributes, textblockTypeInputRule, } from '@tiptap/core'

const Title = Node.create({
  name: 'title',

  content: 'text*',


  // defining: true,

  parseHTML() {
    return [
      { tag: 'title' },
    ]
  },

  renderHTML({ HTMLAttributes }) {

    // return ['h4', {class: "heading"}, ['span', {class: "type"}, "Definition"], ['span', {class: "space"}, " " ], ['span', {class: "codenumber"}, "xx.yy"], ['span', {class: "period"}, "."], ['span', {class: "space"}, " "], ['span', {class: "title"}, 0]]
    return ['div', mergeAttributes({class: "title", label: "title"}, HTMLAttributes), 0]
  },



  addCommands() {
    return {
      setTitle: attributes => ({ commands }) => {
        return commands.setNode(this.name, attributes)
      },
      toggleTitle: attributes => ({ commands }) => {
        return commands.toggleNode(this.name, 'para', attributes)
      },
    }
  },


  addInputRules() {
    return [
      textblockTypeInputRule({
        find: new RegExp(`#t\\s$`),
        type: this.type,
      }),
    ]
  },

})




export default Title;