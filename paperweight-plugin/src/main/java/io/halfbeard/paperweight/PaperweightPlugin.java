package io.halfbeard.paperweight;

import kr.entree.spigradle.annotations.PluginMain;
import org.bukkit.event.Listener;
import org.bukkit.plugin.PluginDescriptionFile;
import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.plugin.java.JavaPluginLoader;

import java.io.File;

@PluginMain
public class PaperweightPlugin extends JavaPlugin implements Listener {

	private final PaperweightRelay relay = new PaperweightRelay();

	public PaperweightPlugin() {
	}

	public PaperweightPlugin(JavaPluginLoader loader, PluginDescriptionFile description, File dataFolder, File file) {
		super(loader, description, dataFolder, file);
	}

	public PaperweightRelay getRelay() {
		return relay;
	}

	@Override
	public void onEnable() {
		getServer().getPluginManager().registerEvents(new PaperweightListener(this), this);

		System.out.println(">>> Paperweight is enabled!");
	}
}
