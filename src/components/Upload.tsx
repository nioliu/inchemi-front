import React, {useState} from "react";
import {Button, Image} from "react-bootstrap";
import {useImmer} from "use-immer";

/**
 * one image upload area
 * @param index
 * @param callBack
 * @constructor
 */
function OneImage({index, callBack}: { index: number, callBack: (remove: boolean, imgFile: File | null) => void }) {
    const [oneImage, setOneImage] = useState("")

    function handleChangeInputImage(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length === 1) {
            const img = event.target.files[0];
            if (img.size > 500 * 1024) {
                alert("image size can't exceed 500KB!")
                return
            }
            const imgUrl = URL.createObjectURL(img);
            setOneImage(imgUrl)
            // callback to parent component
            callBack(false, img,)
        }
    }

    /**
     * remove current component
     */
    function handleClickRemove() {
        callBack(true, null)
    }

    return (
        <div className={"one-img-area"}>
            {/*area fot upload functions*/}
            <div className={"one-upload-area"}>
                <label htmlFor={"file-" + index} className="custum-file-upload">
                    {/*no image uploaded*/}
                    {oneImage === "" && <>
                        <div className="icon">
                            <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                                          fill=""></path>
                                </g>
                            </svg>
                        </div>
                        <div className="text">
                            <span>Click to upload image</span>
                        </div>
                    </>
                    }
                    {/*uploaded one img*/}
                    {
                        oneImage && <img src={oneImage} alt={"load failed"} style={{
                            width: "100%"
                        }}></img>
                    }
                    <input id={"file-" + index} type="file" accept={".jpg,.svg,.png"}
                           onChange={handleChangeInputImage}/>
                </label>
                <Button variant={"dark"} onClick={handleClickRemove}>-</Button>
            </div>
            {/*    area for display corresponding contents*/}
            <div className="description-area">
                <Description
                    chemicalFormula={"H2O"}
                    relateLinks={[
                        {url: "https://en.wikipedia.org/wiki/Water", title: "WIKIPEDIA"},
                        {
                            url: "https://www.google.com/search?q=h2o&sca_esv=b9ffc5f1034f7c9f&sxsrf=ACQVn09XVZYJBZGFXocxuX1Y6ccajh4eDQ%3A1709512034714&ei=YhXlZaSPK-SvptQPmayliAE&ved=0ahUKEwikyMXMrNmEAxXkl4kEHRlWCREQ4dUDCBA&uact=5&oq=h2o&gs_lp=Egxnd3Mtd2l6LXNlcnAiA2gybzIKECMYgAQYigUYJzIKECMYgAQYigUYJzIQEC4YQxixAxjJAxiABBiKBTIKEAAYgAQYFBiHAjIIEAAYgAQYsQMyCxAAGIAEGIoFGJIDMgsQABiABBiKBRiSAzIFEAAYgAQyBRAAGIAEMgUQABiABEitBVC2A1i2A3ABeAGQAQCYAWegAWeqAQMwLjG4AQPIAQD4AQGYAgKgAnbCAgoQABhHGNYEGLADwgINEAAYgAQYigUYQxiwA8ICExAuGEMYgAQYigUYyAMYsAPYAQHCAhMQLhiABBiKBRhDGMgDGLAD2AEBwgIZEC4YgAQYigUYQxjHARjRAxjIAxiwA9gBAZgDAIgGAZAGEroGBggBEAEYCJIHAzEuMaAHtgk&sclient=gws-wiz-serp",
                            title: "Google"
                        }
                    ]}
                    chemImg={"https://upload.wikimedia.org/wikipedia/commons/6/6e/H2O_polarity.svg"}
                >
                </Description>
            </div>
        </div>

    )
}

interface descriptionOneImage {
    chemicalFormula: string;
    relateLinks?: link[];
    chemImg: string;
}

interface link {
    url: string;
    title: string;
}

function Description({chemicalFormula = "", relateLinks, chemImg: chemImgUrl}: descriptionOneImage) {
    let formulaFontSize = "30px";
    if (chemicalFormula.length > 7) {
        formulaFontSize = "18px"
    }

    let linkDesc = null;
    if (relateLinks) {
        linkDesc = relateLinks.map((v, i) => {
            return (
                <li className="one-link" key={i}>
                    <a href={v.url} target={"_blank"}>{v.title}</a>
                </li>
            )
        })
    }

    return (
        <div className="chemi-description">
            {/*formula card*/}
            <div className="card">
                <div className="card-name">Chemical Formula</div>
                <div className="quote">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 330 307"
                        height={80}
                        width={80}
                    >
                        <path
                            fill="currentColor"
                            d="M302.258 176.221C320.678 176.221 329.889 185.432 329.889 203.853V278.764C329.889 297.185 320.678 306.395 302.258 306.395H231.031C212.61 306.395 203.399 297.185 203.399 278.764V203.853C203.399 160.871 207.902 123.415 216.908 91.4858C226.323 59.1472 244.539 30.902 271.556 6.75027C280.562 -1.02739 288.135 -2.05076 294.275 3.68014L321.906 29.4692C328.047 35.2001 326.614 42.1591 317.608 50.3461C303.69 62.6266 292.228 80.4334 283.223 103.766C274.626 126.69 270.328 150.842 270.328 176.221H302.258ZM99.629 176.221C118.05 176.221 127.26 185.432 127.26 203.853V278.764C127.26 297.185 118.05 306.395 99.629 306.395H28.402C9.98126 306.395 0.770874 297.185 0.770874 278.764V203.853C0.770874 160.871 5.27373 123.415 14.2794 91.4858C23.6945 59.1472 41.9106 30.902 68.9277 6.75027C77.9335 -1.02739 85.5064 -2.05076 91.6467 3.68014L119.278 29.4692C125.418 35.2001 123.985 42.1591 114.98 50.3461C101.062 62.6266 89.6 80.4334 80.5942 103.766C71.9979 126.69 67.6997 150.842 67.6997 176.221H99.629Z"
                        />
                    </svg>
                </div>
                <div className="body-text" style={{
                    fontSize: formulaFontSize
                }}>{chemicalFormula}
                </div>
                <div className="author">
                    <svg
                        width={20}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 0H24V24H0z" fill="none"/>
                        <path
                            d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"/>
                    </svg>
                </div>
            </div>
            {/*    related links*/}
            {
                linkDesc && linkDesc.length > 0 &&
                <div className="relate-link">
                    <ul>
                        {linkDesc}
                    </ul>
                </div>
            }
            <div className="img-area" style={{}}>
                <Image src={chemImgUrl}
                       style={{
                           maxWidth: "300px"
                       }}
                       alt={"load failed"}></Image>
            </div>
        </div>
    );
}

interface ImageInfo {
    imgFile: File | null;
    id: number;
}

/**
 * upload image
 * @constructor
 */
export function Upload() {
    const [imageArray, updateImageArray] = useImmer<ImageInfo[]>([
        {
            imgFile: null, id: 0
        }
    ]);

    /**
     * add a new <OneImage> component
     */
    function handleAddClick() {
        updateImageArray((draft) => {
            let currId = 0
            if (draft.length > 0) {
                currId = draft[draft.length - 1].id + 1
            }
            draft.push({imgFile: null, id: currId});
        });
    }

    /**
     * update a new file, this will be called by OneImage component
     */
    function handleFileChange(imgId: number, remove: boolean, imgFile: File | null) {
        updateImageArray((draft) => {
            for (let i = 0; i < draft.length; i++) {
                if (draft[i].id != imgId) {
                    continue
                }
                if (remove) {
                    draft.splice(i, 1)
                } else {
                    draft[i].imgFile = imgFile;
                }
                break
            }
        });
    }

    const imageCompArr = imageArray.map((item) => {
        return (<OneImage key={item.id} index={item.id}
                          callBack={(remove, imgFile) => handleFileChange(item.id, remove, imgFile)}/>)
    })


    function handleSubmit() {
        // 在这里处理提交逻辑，例如上传到服务器
        console.log('Submitting files:', imageArray);
    }

    return (
        <>
            <div className={"upload-form-area"}>
                <div className={"btn-area"} style={{marginBottom: "10px"}}>
                    <Button variant={"primary"} onClick={handleAddClick} style={{
                        marginRight: "10px"
                    }}>+</Button>
                    <Button variant={"primary"} onClick={handleSubmit} style={{}}>Submit</Button>
                </div>

                {imageCompArr}
            </div>
        </>
    );
}
