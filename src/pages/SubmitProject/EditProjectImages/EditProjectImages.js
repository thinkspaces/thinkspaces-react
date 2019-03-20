/* eslint-disable */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styles from './EditProjectImages.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';



// helper function
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const urltoFile = async (url, filename, mimeType) => {
    try {
        let res = await fetch(url)
        let buf = await res.arrayBuffer()
        return new File([buf], filename, { type: mimeType });
    } catch(e) {
        console.log(e)
    }
}

const EditProjectImages = props => {
    const [loading, setLoading] = useState(false)
    const [imageFiles, setImageFiles] = useState([])
    const [imagePreviews, setImagePreviews] = useState([]);
    useEffect(() => console.log(imagePreviews, imageFiles))

    let inputRef = React.createRef();
    const handleInputClick = () => {
        inputRef.current.click()
    }

    const handleShuffleClick = async () => {
        let file = null
        try {
            const result = await axios.get("https://randomillustration.herokuapp.com/")
            const data = "data:image/png;base64," + result.data
            file = await urltoFile(data, "stock.png", "image/*")
        } catch(e) {
            console.log(e)
        }
        setImagePreviews([URL.createObjectURL(file), ...imagePreviews])
        setImageFiles([file, ...imageFiles]);
    }

    const handleRemoveImage = (index) => {
        const cpyPreviews = [...imagePreviews]
        cpyPreviews.splice(index, 1)
        
        const cpyFiles = [...imageFiles]
        cpyFiles.splice(index, 1)

        setImagePreviews(cpyPreviews)
        setImageFiles(cpyFiles)
    }

    const SortableImagePreview = SortableElement(({ preview, index }) =>
        <div className={styles.image}>
            <img src={preview} className={styles.imageDOM} />
            <div 
                onClick={() => handleRemoveImage(index)}
                className={styles.imageCross}>
                <FontAwesomeIcon icon={"times"}/>
            </div>
        </div>
    );

    const SortableImagePreviewList = SortableContainer(({ previews }) => {
        return (
            <div className={styles.images}>
                {/* loading placeholder */}
                {loading ? <div className={styles.placeholder}>
                    <FontAwesomeIcon icon="circle-notch" spin />
                </div> : null}
                {/* images */}
                {previews.map((preview, index) => (
                    <SortableImagePreview key={`item-${index}`} index={index} preview={preview} />
                ))}
                {/* add image input */}
                <div className={styles.placeholder}>
                    <div 
                        className={styles.placeholderItem}
                        onClick={handleInputClick}
                        >
                        <FontAwesomeIcon icon="plus" />
                    </div>
                    <div 
                        className={styles.placeholderItem}
                        onClick={handleShuffleClick}>
                        <FontAwesomeIcon icon="random" />
                    </div>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="pictureFlexItem uploadNewPicture"
                        onChange={handleAddImage}
                    />
                </div>
            </div>
        );
    });

    const handleAddImage = async (event) => {
        const { target: { files } } = event;
        const file = files[0];
        setLoading(true);
        setImageFiles([file, ...imageFiles]);
        setImagePreviews([URL.createObjectURL(file), ...imagePreviews])
        setLoading(false);
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        const reorderedImagePreviews = reorder(
            imagePreviews,
            oldIndex,
            newIndex
        );

        const reorderedImageFiles = reorder(
            imageFiles,
            oldIndex,
            newIndex,
        );

        setImagePreviews(reorderedImagePreviews);
        setImageFiles(reorderedImageFiles);
    }

  return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
            Add images to your project
        </div>
        <SortableImagePreviewList 
        previews={imagePreviews} 
        onSortEnd={onSortEnd}
        axis="x"
        distance={2} />
        <div className={styles.helptext}>
            Reorder images by their relative importance. The first image will be used on the Projects page view.<br></br>
            Click the shuffle button to use one of our illustrations, courtesy of Icons8.
        </div>
      </div>
  )
}

export default EditProjectImages