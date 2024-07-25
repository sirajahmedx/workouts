// api/fetchExercises.ts
import axios from "axios";

interface ExerciseParams {
   muscle?: string;
   type?: string;
   difficulty?: string;
   name?: string;
}

export const FetchExercises = async (
   params: ExerciseParams
): Promise<any[]> => {
   try {
      const response = await axios.get(
         `https://api.api-ninjas.com/v1/exercises`,
         {
            headers: {
               "X-Api-Key": "LqZ4rXw9ETM//xE3X0FdvA==egL527dlueJTIfWK",
            },
            params,
         }
      );

      return response.data;
   } catch (error) {
      console.error("Error fetching exercises:", error);
      throw error;
   }
};
