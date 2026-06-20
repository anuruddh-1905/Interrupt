/**
 * CIRCUIT BREAKER: CLINICAL PROTOCOL DATABASE
 * Each intervention is mapped to a specific neuro-behavioral science technique.
 */

export const INTERVENTION_PROTOCOLS = {
    "DOOM-SCROLLING": {
      id: "doom_scrolling",
      category: "VIRTUAL",
      color: "#007AFF", // Clinical Blue
      duration: 15,
      science: "Variable Reward Interruption",
      instruction: "CLOSE YOUR EYES. Look away from the glass entirely. Your brain is hunting a variable dopamine hit that does not exist. Starve the loop for 15 seconds.",
      completion: "DIGITAL CIRCUIT BROKEN. The screen loop has lost its power. Put the device face down."
    },
    
    "NSFW CONTENT": {
      id: "nsfw_content",
      category: "VIRTUAL",
      color: "#FF3B30", // Alert Red
      duration: 20,
      science: "Urge Surfing & Visual Disengagement",
      instruction: "DEVICE FACE DOWN. Step one foot away from the screen. This is a temporary dopamine spike. Breathe in for 4, hold for 4, exhale for 6.",
      completion: "URGE SURFED. The neurological spike is decaying. Do not touch the device for 5 minutes."
    },
  
    "BINGE EATING": {
      id: "binge_eating",
      category: "PHYSICAL",
      color: "#FF9500", // Warning Orange
      duration: 15,
      science: "Somatic Grounding",
      instruction: "DO NOT MOVE YOUR HANDS. Stand perfectly still. Shift 100% of your brain's processing power to the physical sensation of your feet pressing into the floor.",
      completion: "SOMATIC RESET COMPLETE. Your prefrontal cortex is back online. Walk into a different room."
    },
  
    "NICOTINE / VAPING": {
      id: "vaping",
      category: "PHYSICAL",
      color: "#E59866", // Organic Copper
      duration: 12,
      science: "Competing Motor Response",
      instruction: "CLENCH BOTH FISTS. Squeeze your hands as tightly as possible. We are occupying the hand-to-mouth motor pathway. Hold the tension.",
      completion: "MOTOR LOOP BROKEN. Release your hands. The immediate chemical panic has passed."
    },
  
    "NAIL BITING / PICKING": {
      id: "nail_biting",
      category: "PHYSICAL",
      color: "#E59866", // Organic Copper
      duration: 10,
      science: "Habit Reversal Training (HRT)",
      instruction: "INTERLOCK YOUR FINGERS. Press your thumbs against each other firmly. Make it physically impossible to execute the habit loop. Hold.",
      completion: "TENSION RELEASED. Keep your hands below your shoulders and take a deep breath."
    },
  
    "ANXIETY SPIRAL": {
      id: "anxiety_spiral",
      category: "MENTAL",
      color: "#AF52DE", // Deep Purple
      duration: 15,
      science: "Cognitive Defusion (ACT)",
      instruction: "DO NOT FIGHT THE THOUGHT. Fighting it gives it power. Label it simply as 'background noise'. Watch it float in your mind without interacting with it.",
      completion: "COGNITIVE DECAY COMPLETE. The thought has exhausted its energy. Return to the present physical room."
    }
  };
  
  /**
   * Helper to fetch a protocol array for rendering the UI Grid
   */
  export const getAllProtocols = () => {
    return Object.keys(INTERVENTION_PROTOCOLS).map(key => ({
      title: key,
      ...INTERVENTION_PROTOCOLS[key]
    }));
  };