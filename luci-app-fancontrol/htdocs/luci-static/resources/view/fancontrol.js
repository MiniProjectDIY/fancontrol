'use strict';
'require view';
'require form';
'require uci';

return view.extend({
	// 仅加载配置文件
	load: function() {
		return uci.load('fancontrol');
	},

	render: function(data) {
		var m, s, o;

		m = new form.Map('fancontrol', _('Fan General Control'), 
			_('Configure the fan control script settings. Temperature readings are handled by the background service.'));

		s = m.section(form.TypedSection, 'fancontrol', _('Settings'));
		s.anonymous = true;

		// 启用开关
		o = s.option(form.Flag, 'enabled', _('Enabled'));
		o.rmempty = false;

		// 温度节点路径
		o = s.option(form.Value, 'thermal_file', _('Thermal File Path'));
		o.placeholder = '/sys/class/thermal/thermal_zone0/temp';
		o.datatype = 'file';

		// 风扇控制节点路径
		o = s.option(form.Value, 'fan_file', _('Fan Control File Path'));
		o.placeholder = '/sys/class/thermal/cooling_device0/cur_state';
		o.datatype = 'file';

		// 运行参数
		o = s.option(form.Value, 'start_temp', _('Start Temperature (°C)'));
		o.datatype = 'uinteger';
		o.placeholder = '45';

		o = s.option(form.Value, 'start_speed', _('Initial PWM Speed'));
		o.datatype = 'range(0, 255)';
		o.placeholder = '35';

		o = s.option(form.Value, 'max_speed', _('Maximum PWM Speed'));
		o.datatype = 'range(0, 255)';
		o.placeholder = '255';

		o = s.option(form.Value, 'temp_div', _('Temperature Divisor'));
		o.datatype = 'uinteger';
		o.placeholder = '1000';
		o.description = _('Divider to convert raw value to Celsius (e.g., 1000 for millidegrees).');

		return m.render();
	}
});
