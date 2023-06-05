import styles from "./platforms.module.css";
import {Select} from "antd";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {GlobalContext} from "../../core/context/GlobalContext";

export default function SubscribeToPlatforms() {
    const {user} = useContext(GlobalContext);
    const [platforms, setPlatforms] = useState([]);
    const [submitData, setSubmitData] = useState([]);

    useEffect(() => {
        fetchPlatforms();
    }, []);

    const fetchPlatforms = async () => {
        try {
            const response = await axios.get('http://localhost:9000/platforms');
            setPlatforms(response.data);
        } catch (error) {
            console.error('Error fetching platforms:', error);
        }
    }

    const submitSubscriptions = () => {
        console.log(submitData)
        axios.post('http://localhost:9000/users/subscribe',
            {
                platform_id: submitData,
                username: user.get()?.username
            })
    }

    return (
        <div>
            <div className={styles.formGroup}>
                <label htmlFor="platform">Select platforms to subscribe:</label>
                <Select
                    className={styles.antSelect}
                    mode="multiple"
                    onChange={(value) => setSubmitData(value)}
                >
                    {platforms.map(platform => (
                        <Option key={platform.platform_id} value={platform.platform_id}>
                            {platform.platform_name}
                        </Option>
                    ))}
                </Select>
            </div>
            <button type="submit" className={styles.addButton} onClick={submitSubscriptions}>Submit</button>
        </div>
    )
}
