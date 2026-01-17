import { useEffect, useState } from "react";
import axios from "axios";

export const useNavigationData = () => {
  const [navigation, setNavigation] = useState({ categories: [], pages: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const { data } = await axios.get("/api/navigation"); // Replace with your API endpoint
        setNavigation(data);
      } catch (err) {
        console.error("Failed to fetch navigation data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNavigation();
  }, []);

  return { navigation, loading };
};
