package io.halfbeard.paperweight;

import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerQuitEvent;

import java.util.logging.Logger;

public class PaperweightListener implements Listener {
	private final PaperweightPlugin plugin;

	public PaperweightListener(PaperweightPlugin plugin) {
		this.plugin = plugin;
	}

	public Logger getLogger() {
		return plugin.getLogger();
	}

	public PaperweightRelay getRelay() {
		return plugin.getRelay();
	}

	@EventHandler
	public void onPlayerJoin(PlayerJoinEvent event) {
		getLogger().info("Player joined: " + event.getPlayer().getName());
	}

	@EventHandler
	public void onPlayerQuit(PlayerQuitEvent event) {
		getLogger().info("Player quit: " + event.getPlayer().getName());
	}
}
