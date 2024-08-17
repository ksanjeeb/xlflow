/* eslint-disable @typescript-eslint/no-explicit-any */
import TitleText from "@/components/ui/title-text";
import EditorComponent from "./3dpage.tsx/editor";







function Editor() {
    return (
        <div className="flex flex-col relative">
            <div className="m-4 lg:m-6 absolute ">
                <TitleText text={"Editor"} />
            </div>
            <EditorComponent />

        </div>
    );
}

export default Editor;