type EventName='cta_info_click'|'course_platform_click'|'demo_start'|'demo_complete'|'program_open'|'faq_open';
type Parameters=Partial<Record<'cta_id'|'section_id'|'destination_type'|'module_id'|'demo_step'|'campaign',string>>;
let adapter:((event:EventName,parameters:Parameters)=>void)|undefined;
export function configureAnalytics(handler:typeof adapter, consent:boolean){adapter=consent?handler:undefined;}
export function track(event:EventName,parameters:Parameters={}){adapter?.(event,parameters);}
