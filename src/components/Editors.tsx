import { Splitter, SplitterPanel } from "primereact/splitter";
import { useState } from "react";

import CodeEditor from "./CodeEditor";
import VisualEditor from "./VisualEditor";

import { defaultContent } from '../defaultContent';

//const defaultContent = '<p>Hello World!! 🌍️</p><p>Bye</p>'


const Editors = () => {
    //Content state belongs to the "editors" pair, and it is passed down to the two editors as props.
    const [content, setContent] = useState(defaultContent)

    return (
        <div>
            <h1>PreTeXt Box Editor (demo)</h1>
            <Splitter style={{height: '80vh', width: '98vw'}}>
                <SplitterPanel className="flex align-items-center justify-content-center">
                    <CodeEditor
                    content={content}
                    onChange={( content ) => setContent(content || '')}
                    />
                </SplitterPanel>
                <SplitterPanel className="flex align-items-center justify-content-center">
                    <VisualEditor
                        content={content}
                        onChange={( content ) => setContent(content || '')}
                    />
                </SplitterPanel>
            </Splitter>
        </div>
    )
}

export default Editors;