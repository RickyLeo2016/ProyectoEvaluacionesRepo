using System.Reflection;

namespace Testify.Utilities.HelperExtensions
{
    public static class GetEntityProperties
    {
        public static Dictionary<string, object> GetPropertiesWithValues<T>(this T entity)
        {
            PropertyInfo[] properties = typeof(T).GetProperties();
            var entytyParams = new Dictionary<string, object>();
            foreach (PropertyInfo property in properties)
            {
                object value = property.GetValue(entity)!;
                if (value != null)
                {
                    entytyParams[property.Name] = value;

                }
            }
            return entytyParams;
        }
    }
}
