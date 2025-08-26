import * as fantasy from "./datasets/fantasy";
import * as scifi from "./datasets/scifi";
import * as shakespeare from "./datasets/shakespeare";
import * as noir from "./datasets/noir";
import * as pirate from "./datasets/pirate";
import * as cyberpunk from "./datasets/cyberpunk";
import * as fairytale from "./datasets/fairytale";
import * as greekmyth from "./datasets/greekmyth";
import * as comedy from "./datasets/comedy";
import * as horror from "./datasets/horror";
import * as motivational from "./datasets/motivational";
import * as romantic from "./datasets/romantic";
import * as writer from "./datasets/writer";

export const styles = [
    "Fantasy",
    "Sci-Fi",
    "Shakespeare",
    "Noir Detective",
    "Pirate",
    "Cyberpunk",
    "Fairy Tale",
    "Greek Myth",
    "Comedy",
    "Horror",
    "Motivational",
    "Romantic",
    "Writer"
];

const datasets: Record<string, any> = {
    Fantasy: fantasy,
    "Sci-Fi": scifi,
    Shakespeare: shakespeare,
    "Noir Detective": noir,
    Pirate: pirate,
    Cyberpunk: cyberpunk,
    "Fairy Tale": fairytale,
    "Greek Myth": greekmyth,
    Comedy: comedy,
    Horror: horror,
    Motivational: motivational,
    Romantic: romantic,
    Writer: writer
};

function randomPick(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateStory(style: string, code: string): string {
    const data = datasets[style];
    if (!data) return code;

    const opening = randomPick(data.openings);
    const hero = randomPick(data.heroes);
    const quest = randomPick(data.quests);
    const ending = randomPick(data.endings);

    return `${opening}\n\n\n\n${hero} ${quest} ${ending}`;
}
