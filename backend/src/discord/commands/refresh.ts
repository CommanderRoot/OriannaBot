import { Command } from "../command";
import { expectUser, rawEmote } from "./util";
import * as ipc from "../../cluster/master-ipc";

const RefreshCommand: Command = {
    name: "Refresh",
    smallDescriptionKey: "command_refresh_small_description",
    descriptionKey: "command_refresh_description",
    noTyping: true,
    keywords: ["refresh", "reload", "update", "recalculate"],
    async handler({ ctx, bot, msg }) {
        const user = await expectUser(ctx);
        if (!user) return;

        const loadingEmoji = rawEmote(ctx, "Refreshing")!;

        if (msg.id) bot.addMessageReaction(msg.channelID, msg.id, loadingEmoji);

        // Attempt to update user or time out after 20 seconds.
        await Promise.race([
            ipc.fetchAndUpdateUser(user),
            new Promise((_, reject) => setTimeout(reject, 20000))
        ]);

        // Update timestamps.
        user.$query().patch({
            last_account_update_timestamp: '' + Date.now(),
            last_rank_update_timestamp: '' + Date.now(),
            last_score_update_timestamp: '' + Date.now()
        });

        if (msg.id) {
            bot.removeMessageReaction(msg.channelID, msg.id, loadingEmoji);
            bot.addMessageReaction(msg.channelID, msg.id, "✅");
        }
    }
};
export default RefreshCommand;